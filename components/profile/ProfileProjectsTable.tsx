// "use client";
// import React, { useMemo, useState, useEffect } from "react";
// import { AgGridReact } from "ag-grid-react";
// import {
//   ModuleRegistry,
//   AllCommunityModule,
//   GridApi,
//   GridReadyEvent,
//   ICellRendererParams,
//   ValueGetterParams,
// } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import projectsData from "./data-projects";

// // Define Project type
// interface Project {
//   name: string;
//   type: string[];
//   company: string;
//   start: string;
//   end: string;
//   description: string;
//   stack: string[];
//   demoUrl?: string;
//   repoUrl?: string;
//   items?: string[];
// }

// // Register AG Grid Community Module
// ModuleRegistry.registerModules([AllCommunityModule]);

// const ProjectsTable = () => {
//   const [gridApi, setGridApi] = useState<GridApi | null>(null);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
//     window.innerWidth < 768
//   );

//   // Update screen size state on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Column definitions with conditional visibility and Tailwind separator
//   const columnDefs = useMemo(
//     () => [
//       { headerName: "Name", field: "name", sortable: true, filter: true },
//       {
//         headerName: "Type",
//         field: "type",
//         cellRenderer: ({ data }: ICellRendererParams<Project>) => {
//           if (!data) return "N/A";
//           return data.type.length > 0 ? (
//             <div className="flex flex-wrap gap-1">
//               {data.type.map((item, index) => (
//                 <span
//                   key={index}
//                   className="not-last:after:content-[',_'] not-last:after:ml-1"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           ) : (
//             "N/A"
//           );
//         },
//         sortable: true,
//         filter: true,
//       },
//       { headerName: "Company", field: "company", sortable: true, filter: true },
//       { headerName: "Start", field: "start", sortable: true, filter: true },
//       {
//         headerName: "End",
//         field: "end",
//         valueGetter: ({ data }: ValueGetterParams<Project>) =>
//           data ? data.end || "N/A" : "N/A",
//         sortable: true,
//         filter: true,
//       },
//       {
//         headerName: "Description",
//         field: "description",
//         valueGetter: ({ data }: ValueGetterParams<Project>) =>
//           data ? data.description || "N/A" : "N/A",
//         sortable: true,
//         filter: true,
//         hide: isSmallScreen,
//       },
//       {
//         headerName: "Stack",
//         field: "stack",
//         cellRenderer: ({ data }: ICellRendererParams<Project>) => {
//           if (!data) return "N/A";
//           return data.stack.length > 0 ? (
//             <div className="flex flex-wrap gap-1">
//               {data.stack.map((item, index) => (
//                 <span
//                   key={index}
//                   className="not-last:after:content-[',_'] not-last:after:ml-1"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           ) : (
//             "N/A"
//           );
//         },
//         sortable: true,
//         filter: true,
//       },
//       {
//         headerName: "Demo URL",
//         field: "demoUrl",
//         cellRenderer: ({ value }: ICellRendererParams<Project>) =>
//           value ? (
//             <a href={value} target="_blank" rel="noopener noreferrer">
//               View Demo
//             </a>
//           ) : (
//             "N/A"
//           ),
//         sortable: true,
//         filter: true,
//       },
//       {
//         headerName: "Repo URL",
//         field: "repoUrl",
//         cellRenderer: ({ value }: ICellRendererParams<Project>) =>
//           value ? (
//             <a href={value} target="_blank" rel="noopener noreferrer">
//               View Repo
//             </a>
//           ) : (
//             "N/A"
//           ),
//         sortable: true,
//         filter: true,
//         hide: isSmallScreen,
//       },
//       {
//         headerName: "Items",
//         field: "items",
//         cellRenderer: ({ data }: ICellRendererParams<Project>) => {
//           if (!data) return "N/A";
//           return (data?.items?.length || 0) > 0 ? (
//             <div className="flex flex-wrap gap-1">
//               {(data?.items || []).map((item, index) => (
//                 <span
//                   key={index}
//                   className="not-last:after:content-[',_'] not-last:after:ml-1"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>
//           ) : (
//             "N/A"
//           );
//         },
//         sortable: true,
//         filter: true,
//         hide: isSmallScreen,
//       },
//     ],
//     [isSmallScreen]
//   );

//   // Default column properties
//   const defaultColDef = useMemo(
//     () => ({
//       flex: 1,
//       minWidth: 100,
//       resizable: true,
//     }),
//     []
//   );

//   // Store grid API on load
//   const onGridReady = (params: GridReadyEvent) => {
//     setGridApi(params.api);
//   };

//   return (
//     <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
//       <AgGridReact
//         rowData={projectsData}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         pagination
//         paginationPageSize={10}
//         animateRows
//         onGridReady={onGridReady}
//       />
//     </div>
//   );
// };

// export default ProjectsTable;