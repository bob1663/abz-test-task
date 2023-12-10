import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../components/Card";
import Button from "../components/ui/Button";
import Preloader from "../components/ui/Preloader";

const Users = ({ userAdded, setUserAdded }) => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/users?page=${pageNum}&count=6`
      );
      const data = await response.json();
      if (pageNum === 1) {
        setUsers(data.users);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
      }
      console.log(data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (userAdded) {
      setPage(1);
      fetchUsers(1);
      setUserAdded(false);
    }
  }, [userAdded, setUserAdded]);

  return (
    <section
      className="w-full flex items-center justify-center
     max-w-[1170px] self-center flex-col my-[140px]"
      id="users"
    >
      <h1 className="heading-text text-center px-4">
        Working with GET request
      </h1>

      {isLoading && page === 1 ? (
        <Preloader />
      ) : (
        <>
          <div
            className="mt-[50px] grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3
            gap-[29px] w-full px-4 min-[500px]:px-[32px] md:px-[60px] lg:px-[32px]"
          >
            {users.map((user) => (
              <Card data={user} key={user.id} />
            ))}
          </div>
          {isLoading && page > 1 && (
            <div className="w-full flex justify-center mt-4">
              <Preloader />
            </div>
          )}
          {page < totalPages && !isLoading && (
            <Button
              label="Show more"
              btnStyle="max-w-[120px] mt-[50px]"
              onClick={() => setPage((prev) => prev + 1)}
            />
          )}
        </>
      )}
    </section>
  );
};

Users.propTypes = {
  userAdded: PropTypes.bool.isRequired,
  setUserAdded: PropTypes.func.isRequired,
};

export default Users;
