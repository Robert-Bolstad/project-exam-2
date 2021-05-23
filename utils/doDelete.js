import axios from "axios";
import { BASE_URL } from "../settings/api";

const doDelete = async (data) => {
  const id = data.id;
  const name = data.name;
  const imageId = data.image[0].id;
  const confirmDelete = confirm(
    "Are you sure you want to delete " + name + " from your list?"
  );

  if (confirmDelete) {
    try {
      await axios.delete(BASE_URL + "/establishments/" + id);
      await axios.delete(BASE_URL + "/upload/files/" + imageId);
    } catch (error) {
      console.log("error", error);
    } finally {
      window.location.reload();
    }
  }
};

export default doDelete;
