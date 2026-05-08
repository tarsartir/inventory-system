import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box border-t-4 border-error">
        <h3 className="font-bold text-lg text-error flex items-center gap-2">
          ⚠️ {title}
        </h3>
        <p className="py-4 text-base-content/70 whitespace-pre-line">
          {message}
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-error" onClick={onConfirm}>Eliminar permanentemente</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
    </div>
  );
};

export default ConfirmModal;