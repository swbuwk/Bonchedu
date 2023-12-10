import { useSearchParams } from "react-router-dom";
import { FriendsPageWrapper, FriendsTab, FriendsTabSwitcher, UserList } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/Input/Input";
import { useLazyGetFriendRequestsQuery, useLazyGetFriendsQuery, useLazySearchUsersQuery } from "../../store/services/user";
import FriendItem from "./components/FriendItem";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";

export enum FRIENDS_TABS {
  friends="friends",
  inbox="inbox",
  outbox="outbox",
  all="all"
}

const friendsTabs: Record<FRIENDS_TABS, string> = {
  [FRIENDS_TABS.friends]: "Друзья",
  [FRIENDS_TABS.inbox]: "Входящие",
  [FRIENDS_TABS.outbox]: "Исходящие",
  [FRIENDS_TABS.all]: "Поиск",
}

export const FriendsPage = () => {
  let [searchTab, setTab] = useSearchParams();
  const [getFriends, {data: friends}] = useLazyGetFriendsQuery()
  const [getFriendRequests, {data: requestUsers}] = useLazyGetFriendRequestsQuery()
  const [searchUsers, {data: allUsers}] = useLazySearchUsersQuery()
  const [search, setSarch] = useState<string>("")

  const tab: FRIENDS_TABS = useMemo(() => (searchTab?.get("tab") as FRIENDS_TABS || FRIENDS_TABS.friends), [searchTab])

  useEffect(() => {
    if (tab === FRIENDS_TABS.friends) {
      getFriends(undefined)
    }
    if ([FRIENDS_TABS.inbox, FRIENDS_TABS.outbox].includes(tab)) {
      getFriendRequests(tab)
    }
  }, [tab])

  useDebouncedEffect(() => {
    searchUsers(search)
  }, [search], 700)

  return <FriendsPageWrapper>
    <FriendsTabSwitcher>
      {
        Object.keys(friendsTabs).map(ftab => (
          <FriendsTab key={ftab} active={tab === ftab} onClick={() => setTab({tab: ftab})}>{friendsTabs[ftab as FRIENDS_TABS]}</FriendsTab>
        ))
      }
    </FriendsTabSwitcher>
    {tab === FRIENDS_TABS.all ? 
      <Input 
        placeholder="Введите от 3-х символов"
        value={search}
        onChange={e => setSarch(e.target.value)}
      /> : <></>}
    <UserList>
      {tab === FRIENDS_TABS.friends && friends ? 
        friends.map(friend => (
          <FriendItem key={friend.id} friend={friend} refetch={() => getFriends(undefined)}/>
        ))
      : <></>}
      {[FRIENDS_TABS.inbox, FRIENDS_TABS.outbox].includes(tab) && requestUsers ? 
        requestUsers.map(user => (
          <FriendItem key={user.id} friend={user} refetch={() => getFriendRequests(tab)}/>
        ))
      : <></>}
      {tab === FRIENDS_TABS.all && allUsers ? 
        allUsers.map(user => (
          <FriendItem key={user.id} friend={user} refetch={() => searchUsers(search)}/>
        ))
      : <></>}
    </UserList>
  </FriendsPageWrapper>;
};
