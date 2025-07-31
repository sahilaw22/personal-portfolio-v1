'use client';
import HeadlineGenerator from '@/components/admin/HeadlineGenerator';
import SkillsRecommender from '@/components/admin/SkillsRecommender';

export default function AiToolsAdminPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <HeadlineGenerator />
      <SkillsRecommender />
    </div>
  );
}
