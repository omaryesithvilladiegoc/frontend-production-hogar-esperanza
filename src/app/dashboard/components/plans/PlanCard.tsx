import { motion } from 'framer-motion';
import { Check, Users, Edit, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plan } from '../../types/index.types';

interface PlanCardProps {
  plan: Plan;
  index: number;
  onEdit?: (plan: Plan) => void;
  onDelete?: (planId: string) => void;
}
import { usePlansContext } from '@/app/context/plans';

export function PlanCard({ plan, index, onEdit, onDelete }: PlanCardProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={
        'relative h-[400px] pb-6 scroll-y overflow-hidden overflow-y-scroll bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300'
      }
    >

      <motion.h2 className='flex items-center gap-2 mt-2 mb-4 text-2xl font-bold text-[#333333]'>
      {plan.title}
      </motion.h2>
  
      {/* Features */}
      <ul className="space-y-3 h-[fit-content] overflow-y-auto mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#D4A03A]" />
            </div>
            <span className="text-sm text-[#6E6E6E]">{feature.description}</span>
          </li>
        ))}
      </ul>

    

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2 border-gray-200 hover:bg-gray-50"
          onClick={() => onEdit?.(plan)}
        >
          <Edit className="w-4 h-4" />
          Editar
        </Button>
        <Button
          variant="outline"
          className="px-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete?.(plan.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
