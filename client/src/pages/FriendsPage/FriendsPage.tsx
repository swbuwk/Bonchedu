import { useSearchParams } from "react-router-dom";
import { FriendsPageWrapper, FriendsTab, FriendsTabSwitcher, UserList } from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/Input/Input";
import FriendItem from "./components/FriendItem";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { useLazyGetFriendRequestsQuery, useLazyGetFriendsQuery, useLazySearchUsersQuery } from "../../store/api";

export enum FRIENDS_TABS {
  friends="friends",
  received="received",
  sent="sent",
  all="all"
}

const friendsTabs: Record<FRIENDS_TABS, string> = {
  [FRIENDS_TABS.friends]: "Друзья",
  [FRIENDS_TABS.received]: "Входящие",
  [FRIENDS_TABS.sent]: "Исходящие",
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
    if ([FRIENDS_TABS.sent, FRIENDS_TABS.received].includes(tab)) {
      getFriendRequests(tab === FRIENDS_TABS.received)
    }
  }, [tab])

  useDebouncedEffect(() => {
    if (search.length < 3) return
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
          <FriendItem key={friend.id} friend={friend}/>
        ))
      : <></>}
      {[FRIENDS_TABS.sent, FRIENDS_TABS.received].includes(tab) && requestUsers ? 
        requestUsers.map(request => (
          <FriendItem key={request.user.id} friend={request.user}/>
        ))
      : <></>}
      {tab === FRIENDS_TABS.all && allUsers ? 
        allUsers.map(user => (
          <FriendItem key={user.id} friend={user}/>
        ))
      : <></>}
    </UserList>
  </FriendsPageWrapper>;
};
