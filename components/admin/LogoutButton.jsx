"use server";
import { signOut } from "@/auth";
import { Logout } from "@mui/icons-material";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type="submit" className="px-5 flex items-center gap-4">
        {" "}
        <Logout fontSize="small" />
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
