import React from 'react';
import { ButtonSecondary, Modal } from 'components';
import Image from 'next/image';
import Config from 'config';
import { BiImageAdd } from 'react-icons/bi';
import moment from 'moment';

const EditTimingModal = ({ _this }) => {
  const handleTimeChange = (day, key, value) => {
    _this.setEditTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value
      }
    }));
  };

  return (
    <Modal
      modalVisibility={_this.editTimingModalOpen}
      onClose={() => {
        _this.setEditTimingModalOpen(false);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Update Timings
        </div>
        <div className="flex flex-col space-y-5 py-5 px-3">
          <div>
            <label htmlFor="tue-fri" className="block text-sm font-semibold text-gray-800">
              Tuesday - Friday
            </label>

            <div class="grid grid-cols-2 gap-4 p-1.5">
              <div>
                <label
                  for="start-time"
                  class="block mb-2 text-xs font-medium text-gray-600 dark:text-white"
                >
                  Opens: ({moment(_this.timings?.['tue-fri']?.opens, 'HH:mm').format('h:mm A')})
                </label>
                <div class="relative">
                  <input
                    type="time"
                    id="start-time"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                    value={_this.editTimings['tue-fri']?.opens}
                    onChange={(e) => handleTimeChange('tue-fri', 'opens', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  for="end-time"
                  class="block mb-2 text-xs font-medium text-gray-600 dark:text-white"
                >
                  Closed: ({moment(_this.timings?.['tue-fri']?.closed, 'HH:mm').format('h:mm A')})
                </label>
                <div class="relative">
                  <input
                    type="time"
                    id="end-time"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                    value={_this.editTimings['tue-fri']?.closed}
                    onChange={(e) => handleTimeChange('tue-fri', 'closed', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="tue-fri" className="block font-semibold text-sm text-gray-800">
              Saturday - Sunday
            </label>

            <div class="grid grid-cols-2 gap-4 p-1.5">
              <div>
                <label
                  for="start-time-dt2"
                  class="block mb-2 text-xs font-medium text-gray-600 dark:text-white"
                >
                  Opens: ({moment(_this.timings?.['sat-sun']?.opens, 'HH:mm').format('h:mm A')})
                </label>
                <div class="relative">
                  <input
                    type="time"
                    id="start-time-dt2"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                    value={_this.editTimings['sat-sun']?.opens}
                    onChange={(e) => handleTimeChange('sat-sun', 'opens', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  for="end-time-dt2"
                  class="block mb-2 text-xs font-medium text-gray-600 dark:text-white"
                >
                  Closed: ({moment(_this.timings?.['sat-sun']?.closed, 'HH:mm').format('h:mm A')})
                </label>
                <div class="relative">
                  <input
                    type="time"
                    id="end-time-dt2"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                    value={_this.editTimings['sat-sun']?.closed}
                    onChange={(e) => handleTimeChange('sat-sun', 'closed', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <ButtonSecondary
            label="Update Timings"
            className="text-center w-64 mx-auto"
            onClick={() => _this.updateTimings()}
          />
        </div>
      </>
    </Modal>
  );
};

export default EditTimingModal;
