import LogoutButton from "@/components/layout/LogoutButton";
import Container from "@/components/ui/Container";
import { getServerAuthState } from "@/lib/auth/server";

export default async function AccountPage() {
  const { user } = await getServerAuthState();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6 text-primary">My Account</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {/* Orders will be implemented later */}
        <p className="text-gray-500">No recent orders found.</p>
      </div>

      <div className="flex justify-end mt-4">
        <LogoutButton />
      </div>
    </Container>
  );
}
