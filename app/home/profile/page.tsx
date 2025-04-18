import ProfileForm from "@/components/home/profile/ProfileForm";

export default function Profile() {

	return (
        <div className="">
            <div className="p-6 m-4">
                <h2 className="text-3xl font-bold text-center">
                    Update your <span className="text-blue-500">Profile</span>
                </h2>
            </div>

            <ProfileForm />
        </div>
	);
}
