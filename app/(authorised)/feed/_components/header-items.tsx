"use client"

import { Handshake, House, Mail, } from "lucide-react"
import { HeaderItem } from "./header-item"

export const HeaderItems = () => {
  return (
    <div className="flex items-center gap-4">
        <HeaderItem name="feed" link="/feed" Icon={House}/>
        <HeaderItem name="Messages" link="/feed/messages" Icon={Mail}/>
        <HeaderItem name="Invitations" link="/feed/invitations" Icon={Handshake}/>
    </div>
  )
}