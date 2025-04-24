import { Link } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { HeartIcon, Gift, Calendar, Settings, LogOut } from "lucide-react"
import { WeddingPageForm } from "~/components/wedding-page-form"
import { GiftRegistry } from "~/components/gift-registry"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <HeartIcon className="h-6 w-6 text-pink-500" />
          <span>WeddingWish</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r hidden md:block p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard">
                <Calendar className="h-4 w-4 mr-2" />
                Wedding Details
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard/gifts">
                <Gift className="h-4 w-4 mr-2" />
                Gift Registry
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="wedding-details">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <TabsList>
                <TabsTrigger value="wedding-details">Wedding Details</TabsTrigger>
                <TabsTrigger value="gift-registry">Gift Registry</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="wedding-details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wedding Page</CardTitle>
                  <CardDescription>
                    Customize your wedding page with all the important details for your special day.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WeddingPageForm />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
                  <Button variant="outline" className="ml-2">
                    Preview Page
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="gift-registry" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gift Registry</CardTitle>
                  <CardDescription>
                    Add items to your registry that guests can contribute to for your special day.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GiftRegistry />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button className="bg-pink-500 hover:bg-pink-600">Save Registry</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
