import AccountDropdopwnMenu from '@/components/header/AccountDropdownMenu';

export default function User() {
  return (
    <div className="flex items-center gap-3">
      <span id="usernameLabel" className="typography-small hidden md:block">
        Ayman KAHYA
      </span>
      <AccountDropdopwnMenu aria-labelledby="usernameLabe" />
    </div>
  );
}
