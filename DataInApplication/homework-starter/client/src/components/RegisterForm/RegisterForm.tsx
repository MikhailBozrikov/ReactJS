import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/User";
import { queryClient } from "../api/queryClient";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterFormSchema = z.object({
  username: z.string()
    .nonempty("Имя пользователя обязательное поле")
    .min(5, "Имя пользователя должно содержать не менее пяти символов"),
    
  
  email: z.string()
    .nonempty("Email обязательное поле")
    .email("Некорректный формат электронной почты, например test@mail.com"),
  
  password: z.string()
    .nonempty("Пароль обязательное поле")
    .min(8, "Пароль должен содержать не менее восьми символов")
});

type RegisterFormData = z.infer<typeof RegisterFormSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onTouched"
  });

  const registerMutation = useMutation({
    mutationFn: (formData: RegisterFormData) => 
      registerUser(formData.username, formData.email, formData.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  });
  
  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField 
        label="Имя пользователя" 
        errorMessage={errors.username?.message}
      >
        <input
          {...register("username")}
          placeholder="Минимум 5 символов"
          aria-invalid={!!errors.username}
          disabled={registerMutation.isPending}
        />
      </FormField>
      
      <FormField 
        label="Email" 
        errorMessage={errors.email?.message}
      >
        <input
          type="email"
          {...register("email")}
          placeholder="test@mail.com"
          aria-invalid={!!errors.email}
          disabled={registerMutation.isPending}
        />
      </FormField>
      
      <FormField 
        label="Пароль" 
        errorMessage={errors.password?.message}
      >
        <input
          type="password"
          {...register("password")}
          placeholder="Минимум 8 символов"
          aria-invalid={!!errors.password}
          disabled={registerMutation.isPending}
        />
      </FormField>

      {registerMutation.error && (
        <div className="form-submit-error">
          Ошибка регистрации: {registerMutation.error.message}
        </div>
      )}

      <Button
        type="submit"
        isLoading={registerMutation.isPending || isSubmitting}
        disabled={registerMutation.isPending}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};