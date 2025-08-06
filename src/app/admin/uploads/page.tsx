
'use client';
import ImageUploader from '@/components/admin/ImageUploader';
import ResumeUploader from '@/components/admin/ResumeUploader';

export default function UploadsAdminPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImageUploader />
            <ResumeUploader />
        </div>
    );
}
