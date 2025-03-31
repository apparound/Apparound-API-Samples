import React from 'react'

interface FooterPropsI {}

const Footer = ({}: FooterPropsI) => {
    return (
        <footer className='bg-[#dce1e6]'>
            <div className='container text-[#1D1B20] text-center py-4'>
                <p>@Copyright Apparound. All rights reserved. Apparound S.p.A. P.IVA 13147681004</p>
            </div>
        </footer>
    )
}

export default Footer
