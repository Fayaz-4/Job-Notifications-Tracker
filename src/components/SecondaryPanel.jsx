import Button from "./ui/Button";
import Card from "./ui/Card";

const promptTemplate = `Define a design system token map for:\n- Typography\n- Spacing\n- Borders\n- States`;

function SecondaryPanel() {
  return (
    <aside className="secondary-panel">
      <Card title="Step Explanation">
        <p>Use this panel to define standards before implementing any user-facing product flows.</p>
      </Card>

      <Card title="Copyable Prompt">
        <div className="prompt-box">{promptTemplate}</div>
      </Card>

      <Card title="Actions">
        <div className="button-row">
          <Button variant="primary">Copy Prompt</Button>
          <Button variant="secondary">Mark Reviewed</Button>
        </div>
      </Card>
    </aside>
  );
}

export default SecondaryPanel;
