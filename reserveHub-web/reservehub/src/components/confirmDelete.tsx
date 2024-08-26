'use client';

import { useState } from "react";
import { FC } from "react";

interface ConfirmationDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: ()=> void;
}
const ConfirmationDelete: FC<ConfirmationDeleteProps> = ({isOpen, onClose, onConfirm}) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold text-gray-500">Are you sure you want to delete this item?</p>
                    <p className="text-sm text-gray-500 mb-4">This action cant be undone</p>
                    <div className="flex justify-end space-x-4">

                    <button onClick={onConfirm} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Yes</button>
                    <button onClick={onClose} className="bg-red-300 text-gray-700 px-4 py-2 rounded hover:bg-red-400">Cancel</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default ConfirmationDelete;