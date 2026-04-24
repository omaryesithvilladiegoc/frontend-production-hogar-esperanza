import { useMemo, useState } from 'react';
import { Plus, CreditCard, ListChecks, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { PlanCard } from './PlanCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plan } from '../../types/index.types';
import { usePlansContext } from '@/app/context/plans';
import { toast } from 'sonner';

interface PlanFormValues {
  title: string;
  image: string;
  features: string;
}



export function PlansPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const { plans, createPlan, deletePlan, updatePlan } = usePlansContext();

  // 🟢 CREATE
  const handleCreateSubmit = async (values: PlanFormValues) => {
    const parsedFeatures = values.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)
      .map((f) => ({ description: f }));

    const newPlan = {
      title: values.title.trim(),
      image: values.image.trim(),
      features: parsedFeatures,
    };

    try {
      await createPlan(newPlan);
      toast.success('Plan creado exitosamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el plan');
      throw error;
    }
  };

  // 🔵 UPDATE
  const handleUpdateSubmit = async (values: PlanFormValues) => {
    if (!editingPlan) return;
    console.log(values);
    
    const parsedFeatures = values.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0)
      .map((f) => ({ description: f }));

    const updatedPlan = {
      id: editingPlan.id,
      title: values.title.trim(),
      image: values.image.trim(),
      features: parsedFeatures,
    };

    try {
      await updatePlan(updatedPlan);
      toast.success('Plan actualizado exitosamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el plan');
      throw error;
    }
  };

  const formik = useFormik<PlanFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: editingPlan?.title || '',
      image: editingPlan?.image || '',
      features:
        editingPlan?.features?.map((f) => f.description).join('\n') || '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof PlanFormValues, string>> = {};

      if (!values.title.trim()) {
        errors.title = 'El nombre del plan es obligatorio';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingPlan) {
          await handleUpdateSubmit(values);
        } else {
          await handleCreateSubmit(values);
        }

        resetForm();
        setEditingPlan(null);
        setIsCreateDialogOpen(false);
      } catch (error) {
        console.error(error);
        toast.error('Error al procesar el formulario');
      }
    },
  });

  const handleDelete = async (plan: Plan) => {
    try {
      await deletePlan(plan);
      toast.success('Plan eliminado exitosamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar el plan');
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsCreateDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    setIsCreateDialogOpen(open);

    if (!open) {
      setEditingPlan(null);
      formik.resetForm();
    }
  };

  const totalFeatures = useMemo(() => {
    return plans.reduce((acc, plan) => acc + plan.features.length, 0);
  }, [plans]);

  const plansWithImage = useMemo(() => {
    return plans.filter((plan) => Boolean(plan.image)).length;
  }, [plans]);

  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      <DashboardHeader
        title="Planes de Suscripción"
        subtitle="Gestiona los planes disponibles en la plataforma"
        onCreate={() => {
          setEditingPlan(null);
          setIsCreateDialogOpen(true);
        }}
        createButtonLabel="Crear Plan"
      />

      <main className="p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={index}
              onEdit={() => handleEdit(plan)}
              onDelete={() => handleDelete(plan)}
            />
          ))}

          <motion.div
            onClick={() => {
              setEditingPlan(null);
              setIsCreateDialogOpen(true);
            }}
            className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center min-h-[400px]"
          >
            <Plus className="w-8 h-8 text-gray-400" />
            <h3>Crear Nuevo Plan</h3>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total de Planes" value={plans.length} icon={CreditCard} />
          <SummaryCard title="Total de Características" value={totalFeatures} icon={ListChecks} />
          <SummaryCard title="Planes con Imagen" value={plansWithImage} icon={ImageIcon} />
        </div>
      </main>

      <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? 'Editar Plan' : 'Crear Plan'}
            </DialogTitle>
            <DialogDescription>
              {editingPlan
                ? 'Modifica los detalles del plan.'
                : 'Crea un nuevo plan.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Imagen</Label>
              <Input
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Características</Label>
              <textarea
                name="features"
                value={formik.values.features}
                onChange={formik.handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <DialogFooter>
              <Button type="button" onClick={() => handleCloseDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingPlan ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon }: any) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <Icon />
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
}