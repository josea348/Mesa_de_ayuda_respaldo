import { createContext, useContext, useState } from 'react'
import { deleteTicket, getTicketId, getTicketIdJoin, getTickets, getTicketsJoin, registerTicket, updateTicket } from '../apis/tickets';
import Swal from 'sweetalert2';

const TicketsContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error("useTickets must be used within an TicketsProvider.");
  }
  return context;
}

export const TicketsProvider = ({ children }) => {
  const [ticket, setTicket] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [ticketsJoin, setTicketsJoin] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [ticketIdJoin, setTicketIdJoin] = useState(null);
  const [ticketsError, setTicketsError] = useState(null);
  const [ticketsLoading, setTicketsLoading] = useState(true);

    const listTickets = async () => {
    try {
      const response = await getTickets();
      console.log(response);
      setTickets(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listTicketsJoin = async () => {
    try {
      const response = await getTicketsJoin();
      console.log(response);
      setTicketsJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        console.log(error.response.data.msg)
        setTicketsError(error.response?.data?.msg || "Error al cargar tickets");
        setTicketsJoin(null);
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
        console.log(error.response.data.msg)
        setTicketsError(error.response?.data?.msg || "Error al cargar tickets");
        setTicketsJoin(null);
      }
    } finally {
      setTicketsLoading(false);
    }
  }

  const listTicketId = async (id) => {
    try {
      const response = await getTicketId(id);
      console.log(response.data);
      setTicketId(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const listTicketIdJoin = async (id) => {
    try {
      const response = await getTicketIdJoin(id);
      console.log(response.data);
      setTicketIdJoin(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      }
    }
  }

  const createTicket = async (data) => {
    console.log(data);
    try {
      const response = await registerTicket(data);
      console.log(response);
      setTicket(response.data);
      await listTickets();
      await listTicketsJoin();
      Swal.fire({ title: 'Registro con exito', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const editTicket = async (id, data) => {
    console.log(id);
    console.log(data);
    try {
      const response = await updateTicket(id, data);
      console.log(response);
      setTicket(response.data);
      await listTickets();
      await listTicketsJoin();
      Swal.fire({ title: 'Actualizado', text: response.data.msg, icon: 'success' });
      return { success: true };
    } catch (error) {
      console.log('Error: ' + error.message);
      console.log(error);
      if (error.response.data.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors[0].msg, icon: 'error' });
      } else if (error.response.status === 400) {
        Swal.fire({ title: 'Error!', text: error.response.data.errors.map((error) => error.msg).join(', '), icon: 'error' });
      } else if (error.response.data.status === 404) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else if (error.response.data.status === 500) {
        Swal.fire({ title: 'Error!', text: error.response.data.msg, icon: 'error' });
      } else {
        Swal.fire({ title: 'Error!', text: error.message, icon: 'error' });
      }
      return { success: false };
    }
  }

  const removeTicket = async (id) => {
    try {
      const response = await deleteTicket(id);
      await listTickets();
      await listTicketsJoin();
      Swal.fire({ title: 'Exito!', text: response.data.msg, icon: 'success' });
    } catch (error) {
      console.log([error.response.data.message]);
      Swal.fire({ title: 'Exito!', text: error.response.data.msg, icon: 'error' });
    }
  };

  return (
    <TicketsContext.Provider value={{
      ticket,
      tickets,
      ticketsJoin,
      ticketId,
      ticketIdJoin,
      ticketsError,
      ticketsLoading,
      listTickets,
      listTicketsJoin,
      listTicketId,
      listTicketIdJoin,
      createTicket,
      editTicket,
      removeTicket,
    }}>
      {children}
    </TicketsContext.Provider>
  )
}
