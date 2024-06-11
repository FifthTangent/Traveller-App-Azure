import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import TravellerMap from "@/pages/map"
function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div id="App-Frame" className=" bg-red-400 border w-[600px] p-5 m-auto">
        <div id="Frame-Header" className="pb-3">
          <ModeToggle />
          <span> Test App Frame</span>
        </div>
        <Tabs defaultValue="Map" className="w-full">
          <TabsList>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
          </TabsList>
          <TabsContent value="map">
            <TravellerMap />
          </TabsContent>
          <TabsContent value="trade">Trade Stuff</TabsContent>
        </Tabs>
      </div>
      
     
      
    </div>
  );
}

export default App;
