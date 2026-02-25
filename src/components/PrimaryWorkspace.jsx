import Card from "./ui/Card";
import Input from "./ui/Input";

function PrimaryWorkspace() {
  return (
    <div className="primary-stack">
      <Card title="Card and Input Baseline">
        <Input id="role" label="Role Keyword" placeholder="e.g., Product Analyst" />
      </Card>

      <Card title="Error State Guidance">
        <div className="state-note state-note--error">
          We could not validate this field yet. Add a role keyword and try again.
        </div>
      </Card>

      <Card title="Empty State Guidance">
        <div className="state-note state-note--empty">
          No notifications configured yet. Start by defining one role keyword in the field above.
        </div>
      </Card>
    </div>
  );
}

export default PrimaryWorkspace;
