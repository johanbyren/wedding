import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { WeddingPageForm } from "~/components/wedding-page-form";

const defaultWedding = {
  id: "1",
  title: "Our Wedding",
  description: "Join us in celebrating our love",
  date: new Date().toISOString(),
  location: "",
  imageUrl: "",
};

export default function WeddingDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wedding Details</CardTitle>
        <CardDescription>Manage your wedding information</CardDescription>
      </CardHeader>
      <CardContent>
        <WeddingPageForm wedding={defaultWedding} />
      </CardContent>
    </Card>
  );
} 