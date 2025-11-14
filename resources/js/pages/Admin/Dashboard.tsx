import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Product {
    id: string;
    name: string;
    price: number;
    original_price: number | null;
    image_url: string | null;
    description: string | null;
    category_id: string;
    category?: {
        id: string;
        name: string;
    };
    created_at: string;
}

interface Category {
    id: string;
    name: string;
}

interface Props {
    products: Product[];
    categories: Category[];
}

export default function Dashboard({ products, categories }: Props) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { data: addData, setData: setAddData, post: addPost, processing: addProcessing, reset: addReset } = useForm({
        name: '',
        price: '',
        original_price: '',
        image_url: '',
        description: '',
        category_id: '',
    });

    const { data: editData, setData: setEditData, patch, processing: editProcessing, reset: editReset } = useForm({
        name: '',
        price: '',
        original_price: '',
        image_url: '',
        description: '',
        category_id: '',
    });

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPost(route('admin.products.store'), {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                addReset();
            },
        });
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setEditData({
            name: product.name,
            price: product.price.toString(),
            original_price: product.original_price?.toString() || '',
            image_url: product.image_url || '',
            description: product.description || '',
            category_id: product.category_id,
        });
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProduct) {
            patch(route('admin.products.update', selectedProduct.id), {
                onSuccess: () => {
                    setIsEditDialogOpen(false);
                    editReset();
                    setSelectedProduct(null);
                },
            });
        }
    };

    const handleDelete = (productId: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', productId));
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Product Management</h1>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Add New Product</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to create a new product.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="add-name">Product Name *</Label>
                                    <Input
                                        id="add-name"
                                        value={addData.name}
                                        onChange={(e) => setAddData('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="add-category">Category *</Label>
                                    <Select value={addData.category_id} onValueChange={(value) => setAddData('category_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="add-price">Price *</Label>
                                        <Input
                                            id="add-price"
                                            type="number"
                                            value={addData.price}
                                            onChange={(e) => setAddData('price', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="add-original-price">Original Price</Label>
                                        <Input
                                            id="add-original-price"
                                            type="number"
                                            value={addData.original_price}
                                            onChange={(e) => setAddData('original_price', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="add-image">Image URL</Label>
                                    <Input
                                        id="add-image"
                                        type="url"
                                        value={addData.image_url}
                                        onChange={(e) => setAddData('image_url', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="add-description">Description</Label>
                                    <Textarea
                                        id="add-description"
                                        value={addData.description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddData('description', e.target.value)}
                                        rows={4}
                                    />
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={addProcessing}>
                                        {addProcessing ? 'Creating...' : 'Create Product'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Original Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No products found. Add your first product to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.category?.name}</TableCell>
                                        <TableCell>${product.price}</TableCell>
                                        <TableCell>
                                            {product.original_price ? `$${product.original_price}` : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEditClick(product)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>
                                Update the product details below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-name">Product Name *</Label>
                                <Input
                                    id="edit-name"
                                    value={editData.name}
                                    onChange={(e) => setEditData('name', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="edit-category">Category *</Label>
                                <Select value={editData.category_id} onValueChange={(value) => setEditData('category_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="edit-price">Price *</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        value={editData.price}
                                        onChange={(e) => setEditData('price', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="edit-original-price">Original Price</Label>
                                    <Input
                                        id="edit-original-price"
                                        type="number"
                                        value={editData.original_price}
                                        onChange={(e) => setEditData('original_price', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="edit-image">Image URL</Label>
                                <Input
                                    id="edit-image"
                                    type="url"
                                    value={editData.image_url}
                                    onChange={(e) => setEditData('image_url', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editData.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditData('description', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={editProcessing}>
                                    {editProcessing ? 'Updating...' : 'Update Product'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
