import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [{
        title: 'Admin',
        path: '/admin',
        icon: < FaIcons.FaUserCog / > ,
        iconClosed: < RiIcons.RiArrowDownSFill / > ,
        iconOpened: < RiIcons.RiArrowUpSFill / > ,
        subNav: [{
                title: 'Empresas',
                path: '/admin/empresas',
                icon: < IoIcons.IoMdBusiness / >
            },
            {
                title: 'Tiendas',
                path: '/admin/tiendas',
                icon: < AiIcons.AiFillShop / >
            },
            {
                title: 'Usuarios',
                path: '/admin/usuarios',
                icon: < FaIcons.FaUserFriends / >
            }
        ]
    },
    {
        title: 'Reportes',
        path: '/reportes',
        icon: < IoIcons.IoIosPaper / > ,
        iconClosed: < RiIcons.RiArrowDownSFill / > ,
        iconOpened: < RiIcons.RiArrowUpSFill / > ,
        subNav: [{
                title: 'Ventas',
                path: '/reportes/ventas',
                icon: < RiIcons.RiMoneyDollarCircleFill / >
            },
            {
                title: 'Productos',
                path: '/reportes/reportes',
                icon: < IoIcons.IoMdCart / >
            }
        ]
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: < RiIcons.RiLuggageCartFill / > ,
        iconClosed: < RiIcons.RiArrowDownSFill / > ,
        iconOpened: < RiIcons.RiArrowUpSFill / > ,
        subNav: [{
                title: 'Vender',
                path: '/productos/vender',
                icon: < FaIcons.FaMoneyBillWave / >
            },
            {
                title: 'Ingresar',
                path: '/productos/ingresar',
                icon: < FaIcons.FaCartPlus / >
            },
            {
                title: 'Administrar',
                path: '/productos/administrar',
                icon: < FaIcons.FaUserCog / >
            }
        ]
    },
    {
        title: 'Mensajes',
        path: '/mensajes',
        icon: < IoIcons.IoMdMail / > ,
        iconClosed: < RiIcons.RiArrowDownSFill / > ,
        iconOpened: < RiIcons.RiArrowUpSFill / > ,
        subNav: [{
                title: 'Proveedores',
                path: '/mensajes/proveedores',
                icon: < IoIcons.IoMdBusiness / >
            },
            {
                title: 'Usuarios',
                path: '/mensajes/usuarios',
                icon: < AiIcons.AiFillShop / >
            }
        ]
    },
    {
        title: 'Soporte',
        path: '/soporte',
        icon: < IoIcons.IoMdHelpCircle / >,
        iconClosed: < RiIcons.RiArrowDownSFill / > ,
        iconOpened: < RiIcons.RiArrowUpSFill / > ,
        subNav: [{
                title: 'Contactar soporte',
                path: '/soporte',
                icon: < IoIcons.IoMdHelpCircle / >
            }
        ]
    },
]