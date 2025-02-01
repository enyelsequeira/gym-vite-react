import { createFormContext } from '@mantine/form';

export interface Workout {
  exercise: string;
  sets: string;
  reps: string;
  notes: string;
  isEditing: boolean;
  completed?: boolean;
  remainingSets?: number; // Add this field
}
interface FormValues {
  dateRange: [Date | null, Date | null];
  days: {
    [key: string]: Workout[];
  };
}
export const [WorkoutFormProvider, useWorkoutFormContext, useWorkoutForm] =
  createFormContext<FormValues>();
