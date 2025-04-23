import { CardTitle, CardDescription } from "@/components/ui/card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const user = {
    name: "Nikhil Kamalnath",
    emailid: "email@id.com",
    role: "Admin",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl p-16 shadow-lg rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
            {initials}
          </div>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription className="text-gray-500">{user.role}</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="space-y-4">
            <div>
              <span className="block text-sm font-semibold text-gray-700">Name</span>
              <span className="block text-lg">{user.name}</span>
            </div>
            <div>
              <span className="block text-sm font-semibold text-gray-700">Email</span>
              <span className="block text-lg">{user.emailid}</span>
            </div>
            <div>
              <span className="block text-sm font-semibold text-gray-700">Role</span>
              <span className="block text-lg">{user.role}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}