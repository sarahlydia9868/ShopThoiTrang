interface IDashBoardTable {
  userID: number;
  name: string;
  username: string;
  email: string;
}

export default function DashBoardTable({ userID, name, username, email }: IDashBoardTable) {
  return (
    <tr className=" text-black border-b border-primary odd:hover:bg-primary even:hover:bg-secondary hover:text-primal transition-colors duration-200">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
        {userID}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{username}</td>
      <td className="px-6 py-4 ">{email}</td>
    </tr>
  );
}
