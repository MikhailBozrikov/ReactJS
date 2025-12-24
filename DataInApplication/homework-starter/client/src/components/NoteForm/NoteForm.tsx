import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../api/Note";
import { queryClient } from "../api/queryClient";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const NoteFormSchema = z.object({
  title: z.string()
    .nonempty("Обязательное поле для заполнения")
    .min(5, "Заголовок должен содержать не менее 5 символов"),
  text: z.string()
    .nonempty("Обязательное поле для заполнения")
    .min(10, "Текст должен содержать не менее 10 символов")
    .max(300, "Текст должен содержать не более 300 символов"),
})

type NoteFormData = z.infer<typeof NoteFormSchema>;

export const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset // добавляем reset для очистки формы
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteFormSchema),
    mode: "onTouched"
  });

  const createNoteMutation = useMutation({
    mutationFn: (formData: NoteFormData) =>
      createNote(formData.title, formData.text),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      reset(); // очищаем форму после успешной отправки
    }
  });

  const onSubmit = (data: NoteFormData) => {
    createNoteMutation.mutate(data);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField 
        label="Заголовок" 
        errorMessage={errors.title?.message}
      >
        <input
          type="text"
          {...register("title")}
          placeholder="Введите заголовок заметки"
          aria-invalid={!!errors.title}
          disabled={createNoteMutation.isPending}
        />
      </FormField>
      
      <FormField 
        label="Текст" 
        errorMessage={errors.text?.message}
      >
        <textarea
          {...register("text")}
          aria-invalid={!!errors.text}
          disabled={createNoteMutation.isPending}
          rows={5}
        />
      </FormField>
      
      {createNoteMutation.error && (
        <div className="error-message">
          Ошибка создания заметки: {createNoteMutation.error.message}
        </div>
      )}

      <Button
        type="submit"
        isLoading={createNoteMutation.isPending || isSubmitting}
        disabled={createNoteMutation.isPending}
      >
        Сохранить
      </Button>
    </form>
  );
};