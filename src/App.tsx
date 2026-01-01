import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { BookingForm } from "./examples/BookingForm";
import { LocationSelector } from "./examples/LocationSelector";
import { SUPBoardGrid } from "./examples/SUPBoardGrid";
import { SUPHero } from "./examples/SUPHero";

function App() {
  return (
    <AllProviders>
      <Header />
      <SUPHero />
      <LocationSelector />
      <SUPBoardGrid />
      <BookingForm />
      <Footer />
    </AllProviders>
  );
}

export default App;
