import { Breadcrumbs } from '@mui/material';
import React from 'react'
import { Link} from 'react-router-dom'

const AppBreadcrumbs = ({ subpage,crntPage,path }) => {
  return (
    <div>
          <Breadcrumbs separator=' > ' aria-label="breadcrumb">
              <Link to={path}>{subpage}</Link>
              <p>{crntPage}</p>
        </Breadcrumbs>
    </div>
  )
}




// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import * as React from 'react';

// export default function DynamicBreadcrumbs() {
//   const crumbs = [
//     { name: 'Home', href: '/' },
//     { name: 'Core', href: '/getting-started/installation/' },
//     { name: 'Breadcrumb' },
//   ];

//   return (
//     <Breadcrumbs aria-label="breadcrumb">
//       {crumbs.map((crumb, index) => {
//         const last = index === crumbs.length - 1;
//         const href = crumb.href ?? '#';

//         return last ? (
//           <Typography color="text.primary" key={crumb.name}>
//             {crumb.name}
//           </Typography>
//         ) : (
//           <Link underline="hover" color="inherit" href={href} key={crumb.name}>
//             {crumb.name}
//           </Link>
//         );
//       })}
//     </Breadcrumbs>
//   );
// }

export default AppBreadcrumbs;