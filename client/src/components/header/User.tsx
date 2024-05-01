import AccountDropdopwnMenu from '@/components/header/AccountDropdownMenu';
import { useAuth } from '@/hooks';

export default function User() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <span id="usernameLabel" className="typography-small hidden md:block">
        <b>{user?.username}</b>
      </span>
      <AccountDropdopwnMenu aria-labelledby="usernameLabe" />
    </div>
  );
}
