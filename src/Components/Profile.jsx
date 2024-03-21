import { NavLink, Outlet } from "react-router-dom";
export default function () {
  return (
    <>
      <div className="flex h-[86.2vh] bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white">
          <nav className="flex flex-col mt-4">
            <NavLink
              to=""
              className="px-4 py-2 text-lg border-b border-gray-700 hover:bg-gray-700 hover:text-white text-center"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tutorprofile/courses"
              className="px-4 py-2 text-lg border-b border-gray-700 hover:bg-gray-700 hover:text-white text-center"
            >
              Courses
            </NavLink>

            <NavLink
              to="/tutorprofile/setting"
              className="px-4 py-2 text-lg border-b border-gray-700 hover:bg-gray-700 hover:text-white text-center"
            >
              Settings
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-4 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
}
