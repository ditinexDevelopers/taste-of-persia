import React from 'react';
import { MdCheck, MdDownloading, MdOutlineFastfood, MdOutlineDeliveryDining } from 'react-icons/md';

const Component = ({ status, onClick = null, readyIn }) => {
  const CompletedStatus = () => {
    return (
      <div
        className="bg-green-200 w-44 flex flex-row items-center p-1 text-green-800 border border-green-400 rounded-full text-sm cursor-pointer"
        onClick={onClick}
      >
        <MdCheck className="bg-green-400 rounded-full w-7 h-7 p-1 mr-1" /> Completed
      </div>
    );
  };

  const CancelledStatus = () => {
    return (
      <div
        className="bg-red-200 w-44 flex flex-row items-center p-1 text-red-800 border border-red-400 rounded-full text-sm cursor-pointer"
        onClick={onClick}
      >
        <MdCheck className="rounded-full bg-red-400 w-7 h-7 p-1 mr-1" /> Cancelled
      </div>
    );
  };

  const PendingStatus = () => {
    return (
      <div
        className="bg-slate-200 w-44 flex flex-row items-center p-1 text-slate-800 border border-slate-400 rounded-full text-sm cursor-pointer"
        onClick={onClick}
      >
        <MdDownloading className="rounded-full bg-slate-400 w-7 h-7 p-1 mr-1" /> Waiting to accept
      </div>
    );
  };

  const ProcessingStatus = () => {
    return (
      <div
        className="bg-amber-200 w-44 flex flex-row p-1 text-amber-800 border border-amber-400 rounded-full text-xs cursor-pointer"
        onClick={onClick}
      >
        <span className="flex flex-row items-center">
          <MdOutlineFastfood className="rounded-full bg-amber-400 w-7 h-7 p-1 mr-1" />
        </span>
        {readyIn && (
          <div className="flex flex-col">
            <span>In Kitchen</span>
            <span>
              Ready In :{' '}
              <span className="font-semibold">
                {parseInt(readyIn.hours() >= 0 ? readyIn.hours() : 0)} h{' '}
                {parseInt(readyIn.minutes() >= 0 ? readyIn.minutes() : 0) % 60} min{' '}
              </span>
            </span>
          </div>
        )}
      </div>
    );
  };

  const ReadyStatus = () => {
    return (
      <div
        className="bg-cyan-200 w-44 flex flex-row items-center p-1 text-cyan-800 border border-cyan-400 rounded-full text-sm cursor-pointer"
        onClick={onClick}
      >
        <MdOutlineDeliveryDining className="rounded-full bg-cyan-400 w-7 h-7 p-1 mr-1" />
        Ready to Pickup
      </div>
    );
  };

  const display = () => {
    switch (status) {
      case 'Completed':
        return <CompletedStatus />;
      case 'Pending':
        return <PendingStatus />;
      case 'In Kitchen':
        return <ProcessingStatus />;
      case 'Ready To Pickup':
        return <ReadyStatus />;
      default:
        return <CancelledStatus />;
    }
  };

  return display();
};

export default Component;
