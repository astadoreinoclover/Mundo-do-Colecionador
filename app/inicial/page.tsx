'use client'
import Link from "next/link"
import "./inicial.css"
import { useContext, useEffect, useState } from 'react';
import { ClienteContext } from "../context/ClienteContext"
function Inicial() {

  return (
    <div className="max-w-7xl mx-auto mt-6 area">
        <Link href="/cadastrar-item" className="area-mais">
            Adicionar item
            <span className="mais">+</span>
        </Link>
    </div>
  )
}

export default Inicial