import { useQuery } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query";
import { fetchMe, logout } from "../api/User"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { queryClient } from "../api/queryClient";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import "./Account.css";
import { Button } from "../Button";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: fetchMe,
        queryKey: ["users", "me"],
    });

    const handleAuthSuccess = () => {
        meQuery.refetch();
    };

    switch (meQuery.status) {
        case "pending":
            return <Loader />;

        case "error":
            return <AuthForm onSuccess={handleAuthSuccess} />;

        case "success":
            return (
                <div className="account">
                    <div className="account__user">
                        <MeAccount user={meQuery.data} />
                        <NoteForm />
                    </div>
                    <FetchNoteListView />
                </div>
            );
    }
};

const MeAccount = ({ user }: { user: { username: string; email: string } }) => {
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            window.location.reload();
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="me-account">
            <div className="me-account__info">
                <h3 className="me-account__name">{user.username}</h3>
                <p className="me-account__email">{user.email}</p>
            </div>
            
            <Button
                onClick={handleLogout}
                isLoading={logoutMutation.isPending}
                disabled={logoutMutation.isPending}
                variant="secondary"
                className="me-account__logout"
            >
                Выход
            </Button>
        </div>
    );
};