'use client';
import NewChat from '@/components/NewChat';
import ChatRow from '@/components/ChatRow';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession, signOut } from 'next-auth/react';
import { db } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <div className="bg-black p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* New Chat btn */}

        <NewChat />
        <div>
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>

        {/* Chat list */}
      </div>
      {session && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                onClick={() => signOut()}
                src={session.user?.image ?? ''}
                alt="user"
                className="rounded-full h-10 w-10 m-2 cursor-pointer hover:opacity-50"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default SideBar;
