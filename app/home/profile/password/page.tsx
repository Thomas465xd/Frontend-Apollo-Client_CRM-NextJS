import ResetPasswordForm from "@/components/home/profile/ResetPasswordForm";

export default function ResetPassword() {

    return (
        <div className="">
            <div className="p-6 m-4">
                <h2 className="text-3xl font-bold text-center">
                    Reset Your Password
                </h2>
            </div>
    
            <ResetPasswordForm />
        </div>
    );
}
