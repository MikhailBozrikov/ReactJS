import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/User";
import { queryClient } from "../api/queryClient";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginFormSchema = z.object({
  email: z.string()
    .nonempty("Email обязательное поле")
    .email("Некорректный формат электронной почты, например test@mail.com"),
  
  password: z.string()
    .nonempty("Пароль обязательное поле")
    .min(8, "Пароль должен содержать не менее восьми символов")
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onTouched"
  });

  const loginMutation = useMutation({
    mutationFn: (formData: LoginFormData) => 
      login(formData.email, formData.password),
    onSuccess: () => {
      console.log("✅ Login успешен, инвалидирую кэш...");
      
      // 1. Инвалидируем кэш
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      
      // 2. Ждем немного, чтобы инвалидация завершилась
      setTimeout(() => {
        // 3. Вызываем колбэк для обновления Account
        onSuccess?.();
      }, 200);
    }
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("📤 Отправляю форму логина:", data.email);
    loginMutation.mutate(data);
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField 
        label="Email"
        errorMessage={errors.email?.message}
      >
        <input
          type="email"
          {...register("email")}
          placeholder="test@mail.com"
          aria-invalid={!!errors.email}
          disabled={loginMutation.isPending}
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
          disabled={loginMutation.isPending}
        />
      </FormField>

      {loginMutation.error && (
        <div className="form-submit-error">
          Ошибка авторизации: {loginMutation.error.message}
        </div>
      )}

      <Button
        type="submit"
        isLoading={loginMutation.isPending || isSubmitting}
        disabled={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};