import ContextHeader from "../components/ContextHeader";
import PrimaryWorkspace from "../components/PrimaryWorkspace";
import ProofFooter from "../components/ProofFooter";
import SecondaryPanel from "../components/SecondaryPanel";
import TopBar from "../components/TopBar";

function AppLayout() {
  return (
    <main className="app-shell">
      <TopBar />
      <ContextHeader />
      <section className="workspace">
        <PrimaryWorkspace />
        <SecondaryPanel />
      </section>
      <ProofFooter />
    </main>
  );
}

export default AppLayout;
