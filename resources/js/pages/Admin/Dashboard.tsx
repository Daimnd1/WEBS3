import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, Link } from '@inertiajs/react';
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Smartphone, Watch, Laptop, Headphones, Tablet, Camera, Speaker, Monitor } from 'lucide-react';

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
    products: Product[] | null;
    categories: Category[];
    selectedCategoryId?: string;
}

export default function Dashboard({ products, categories, selectedCategoryId }: Props) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const selectedCategory = categories.find(c => c.id === selectedCategoryId);

    const getCategoryIcon = (categoryName: string) => {
        const name = categoryName.toLowerCase();
        if (name.includes('phone')) return Smartphone;
        if (name.includes('watch')) return Watch;
        if (name.includes('laptop') || name.includes('computer')) return Laptop;
        if (name.includes('headphone') || name.includes('earphone') || name.includes('audio')) return Headphones;
        if (name.includes('tablet')) return Tablet;
        if (name.includes('camera')) return Camera;
        if (name.includes('speaker')) return Speaker;
        if (name.includes('monitor') || name.includes('display')) return Monitor;
        return Smartphone; // default
    };

    const { data: addData, setData: setAddData, post: addPost, processing: addProcessing, reset: addReset } = useForm({
        name: '',
        price: '',
        original_price: '',
        image_url: '',
        description: '',
        category_id: selectedCategoryId || '',
    });

    useEffect(() => {
        if (selectedCategoryId) {
            setAddData('category_id', selectedCategoryId);
        }
    }, [selectedCategoryId]);

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
                {!selectedCategoryId ? (
                    // Category Selection View
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Select a Category</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {categories.map((category) => {
                                const Icon = getCategoryIcon(category.name);
                                return (
                                    <Link
                                        key={category.id}
                                        href={route('admin.dashboard', { category: category.id })}
                                        className="block group"
                                    >
                                        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full border-2 hover:border-indigo-400">
                                            <CardContent className="flex flex-col items-center justify-center p-6">
                                                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                                                    <Icon className="w-8 h-8 text-indigo-600" />
                                                </div>
                                                <CardTitle className="text-lg text-center">{category.name}</CardTitle>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    // Product Management View
                    <div>
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Link href={route('admin.dashboard')}>
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                        <ArrowLeft className="w-4 h-4 mr-1" />
                                        Back
                                    </Button>
                                </Link>
                                <span className="text-gray-400">/</span>
                                <span className="text-sm text-gray-600">{selectedCategory?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold">
                                    {selectedCategory?.name} Products
                                </h1>
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
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                                        <TableHead className="w-20">Image</TableHead>
                                        <TableHead className="font-semibold">Name</TableHead>
                                        <TableHead className="font-semibold">Category</TableHead>
                                        <TableHead className="font-semibold">Price</TableHead>
                                        <TableHead className="font-semibold">Original Price</TableHead>
                                        <TableHead className="text-right font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!products || products.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-12">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="text-gray-400 text-lg">📦</div>
                                                    <p className="text-gray-500 font-medium">No products found</p>
                                                    <p className="text-gray-400 text-sm">Add your first product to get started</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        products.map((product) => (
                                            <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell>
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                                            No image
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-semibold text-gray-900">{product.name}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                        {product.category?.name}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="font-semibold text-gray-900">${product.price}</TableCell>
                                                <TableCell className="text-gray-500">
                                                    {product.original_price ? (
                                                        <span className="line-through">${product.original_price}</span>
                                                    ) : (
                                                        <span>-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2 justify-end">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEditClick(product)}
                                                            className="hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(product.id)}
                                                            className="hover:bg-red-600"
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
                )}
            </div>
        </AppLayout>
    );
}
