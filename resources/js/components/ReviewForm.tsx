import { useState } from 'react';
import { router } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import { Textarea } from './ui/textarea';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import InputError from './InputError';
import { Star } from 'lucide-react';

interface ReviewFormProps {
    show: boolean;
    onClose: () => void;
    productId: string;
    productName: string;
}

export default function ReviewForm({ show, onClose, productId, productName }: ReviewFormProps) {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [errors, setErrors] = useState<{ rating?: string; comment?: string; product_id?: string }>({});
    const [processing, setProcessing] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        setErrors({});
        setSuccessMessage('');
        
        const newErrors: { rating?: string; comment?: string } = {};
        if (rating === 0) {
            newErrors.rating = 'Please select a rating';
        }
        if (!comment.trim()) {
            newErrors.comment = 'Please write a review comment';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setProcessing(true);
        
        router.post(route('reviews.store'), {
            product_id: productId,
            rating: rating,
            comment: comment.trim(),
        }, {
            onSuccess: () => {
                setSuccessMessage('Review submitted successfully!');
                setRating(0);
                setComment('');
                setHoveredRating(0);
                setTimeout(() => {
                    onClose();
                    setSuccessMessage('');
                }, 1500);
            },
            onError: (errors) => {
                setErrors(errors as { rating?: string; comment?: string; product_id?: string });
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleClose = () => {
        if (!processing) {
            setRating(0);
            setComment('');
            setHoveredRating(0);
            setErrors({});
            onClose();
        }
    };

    return (
        <Modal show={show} onClose={handleClose}>
            <div
                className="p-6"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                    <p className="mt-1 text-sm text-gray-600">Share your thoughts about {productName}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {successMessage && (
                        <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800">
                            {successMessage}
                        </div>
                    )}
                    
                    <div className="mb-6">
                        <InputLabel htmlFor="rating" value="Rating" children={undefined} />
                        <div className="mt-2 flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none"
                                    disabled={processing}
                                >
                                    <Star
                                        className={`h-8 w-8 transition-colors ${
                                            star <= (hoveredRating || rating)
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                            {rating > 0 && (
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    {rating} {rating === 1 ? 'star' : 'stars'}
                                </span>
                            )}
                        </div>
                        {errors.rating && (
                            <InputError message={errors.rating} className="mt-2" />
                        )}
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="comment" value="Your Review" children={undefined} />
                        <Textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={6}
                            className="mt-2 w-full"
                            placeholder="Share your experience with this product..."
                            disabled={processing}
                        />
                        {errors.comment && (
                            <InputError message={errors.comment} className="mt-2" />
                        )}
                        {errors.product_id && (
                            <InputError message={errors.product_id} className="mt-2" />
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton
                            type="button"
                            onClick={handleClose}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Submitting...' : 'Submit Review'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

