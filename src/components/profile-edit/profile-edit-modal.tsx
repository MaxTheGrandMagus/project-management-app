import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onDeleteUser: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileEditModal = (props: Props) => {
  return (
    <section className="modal w-full flex flex-col bg-white border-0 rounded-lg outline-none shadow-lg focus:outline-none">
      <div className="flex-auto p-4">
        <p className="my-4 text-lg leading-relaxed text-slate-500">
          Are you sure you want to delete your account?
        </p>
      </div>
      <div className="flex justify-between items-center p-4 border-t border-solid border-slate-200 rounded-b">
        <button
          className="bg-transparent px-6 py-3 text-red-500 font-bold uppercase text-sm rounded outline-none focus:outline-none ease-linear transition-all"
          type="button"
          onClick={() => props.setShowModal(false)}
        >
          Close
        </button>
        <button
          className="bg-emerald-500 px-6 py-3 text-white font-bold uppercase text-sm rounded outline-none active:bg-emerald-600 focus:outline-none ease-linear transition-all"
          type="button"
          onClick={props.onDeleteUser}
        >
          Yes, I'm sure
        </button>
      </div>
    </section>
  )
}

export default ProfileEditModal;