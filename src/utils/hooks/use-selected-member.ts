import { atom, useAtom } from "jotai";

import { type User } from "@prisma/client";

export const selectedMemberAtom = atom<User | undefined>(undefined);

export const useSelectedMember = () => {
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);

  const selectMember = (member: User) => {
    setSelectedMember(member);
  };

  return { selectedMember, selectMember };
};
