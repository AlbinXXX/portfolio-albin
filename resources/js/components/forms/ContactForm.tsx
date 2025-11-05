import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from '@inertiajs/react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const contactMutation = useMutation({
        mutationFn: async (data: ContactFormData) => {
            return new Promise((resolve, reject) => {
                router.post('/contact', data, {
                    onSuccess: (page) => {
                        console.log('Contact form success:', page);
                        resolve(data);
                    },
                    onError: (errors) => {
                        console.error('Contact form validation errors:', errors);
                        reject(errors);
                    },
                    onFinish: () => {
                        console.log('Contact form request finished');
                    }
                });
            });
        },
        onSuccess: () => {
            toast.success('Message sent successfully! I\'ll get back to you soon.');
            reset();
        },
        onError: (error) => {
            console.error('Contact form error:', error);
            // Check if it's a validation error or server error
            if (typeof error === 'object' && error !== null && 'message' in error) {
                toast.error(`Error: ${(error as Error).message}`);
            } else if (typeof error === 'object' && error !== null) {
                // Handle validation errors
                try {
                    const errorMessages = Object.values(error as unknown as Record<string, string[]>)
                        .flat()
                        .join(', ');
                    toast.error(`Validation error: ${errorMessages}`);
                } catch {
                    toast.error('Failed to send message. Please try again.');
                }
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        },
    });

    const onSubmit = (data: ContactFormData) => {
        contactMutation.mutate(data);
    };

    return (
        <div className={className}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Your full name"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="your.email@example.com"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What is this about?"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20"
                    />
                    {errors.subject && (
                        <p className="text-sm text-red-400">{errors.subject.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20 resize-none"
                    />
                    {errors.message && (
                        <p className="text-sm text-red-400">{errors.message.message}</p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full sm:w-auto min-w-[120px] bg-[#a7ef9e] hover:bg-[#95e68a] text-black font-medium"
                >
                    {contactMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}