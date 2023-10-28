import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import InputField from "../common/InputField";

import {
  getUser,
  updateProfileWork,
  updateProfileEducation,
  updateProfileCity,
} from "../../api";
import {
  incrementUpdateWorkCount,
  incrementUpdateEducationCount,
  incrementUpdateCityCount,
} from "../../slices/profileSlice";

const Intro = ({
  user,
  userId,
  isWorkClick,
  isEducationClick,
  isCityClick,
  setIsWorkClick,
  setIsEducationClick,
  setIsCityClick,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [userIntro, setUserIntro] = useState("");
  const [work, setWork] = useState("");
  const [education, setEducation] = useState("");
  const [city, setCity] = useState("");
  const [isWorkLoading, setIsWorkLoading] = useState(true);
  const [isEducationLoading, setIsEducationLoading] = useState(true);
  const [isCityLoading, setIsCityLoading] = useState(true);

  const [isEditClick, setIsEditClick] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const updateWorkCount = useSelector((state) => state.profile.updateWorkCount);
  const updateEducationCount = useSelector(
    (state) => state.profile.updateEducationCount
  );
  const updateCityCount = useSelector((state) => state.profile.updateCityCount);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setWork(fetchedUserIntro.data.user.profile.work);
        setEducation(fetchedUserIntro.data.user.profile.education);
        setCity(fetchedUserIntro.data.user.profile.city);
        setIsWorkLoading(false);
        setIsEducationLoading(false);
        setIsCityLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, []);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        setIsWorkLoading(true);
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setWork(fetchedUserIntro.data.user.profile.work);
        setIsWorkLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, [userId, token, user._id, updateWorkCount]);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        setIsEducationLoading(true);
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setEducation(fetchedUserIntro.data.user.profile.education);
        setIsEducationLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, [userId, token, user._id, updateEducationCount]);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        setIsCityLoading(true);
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setCity(fetchedUserIntro.data.user.profile.city);
        setIsCityLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, [userId, token, user._id, updateCityCount]);

  function handleEditClick() {
    if (
      (isWorkClick && isEducationClick && isCityClick) ||
      (!isWorkClick && !isEducationClick && !isCityClick)
    ) {
      setIsWorkClick(!isWorkClick);
      setIsEducationClick(!isEducationClick);
      setIsCityClick(!isCityClick);
    } else {
      setIsWorkClick(false);
      setIsEducationClick(false);
      setIsCityClick(false);
    }
  }

  const handleKeyPressWork = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onWorkSubmit)();
    }
  };

  const handleKeyPressEducation = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onEducationSubmit)();
    }
  };

  const handleKeyPressCity = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onCitySubmit)();
    }
  };

  const onWorkSubmit = async (data) => {
    await updateProfileWork(token, user._id, data);
    setIsWorkClick(false);
    dispatch(incrementUpdateWorkCount());
  };

  const onEducationSubmit = async (data) => {
    await updateProfileEducation(token, user._id, data);
    setIsEducationClick(false);
    dispatch(incrementUpdateEducationCount());
  };

  const onCitySubmit = async (data) => {
    await updateProfileCity(token, user._id, data);
    setIsCityClick(false);
    dispatch(incrementUpdateCityCount());
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col gap-y-1">
      <div className="font-bold text-lg">Intro</div>
      {isWorkLoading ? (
        <div>Loading...</div>
      ) : isWorkClick ? (
        <form className="flex gap-x-2" onSubmit={handleSubmit(onWorkSubmit)}>
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="work"
          />
          <InputField
            register={register}
            errors={errors}
            id="work"
            type="text"
            value={work}
            setPostContent={setWork}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile work"
            handleKeyPress={handleKeyPressWork}
          />
        </form>
      ) : userIntro.work ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="work"
          />
          <div className="font-bold">{userIntro.work}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button onClick={() => setIsWorkClick(true)} className="w-full">
              Add work
            </button>
          </div>
        )
      )}

      {isEducationLoading ? (
        <div>Loading...</div>
      ) : isEducationClick ? (
        <form
          className="flex gap-x-2"
          onSubmit={handleSubmit(onEducationSubmit)}
        >
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="school"
          />
          <InputField
            register={register}
            errors={errors}
            id="education"
            type="text"
            value={education}
            setPostContent={setEducation}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile education"
            handleKeyPress={handleKeyPressEducation}
          />
        </form>
      ) : userIntro.education ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="school"
          />
          <div className="font-bold">{userIntro.education}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button
              onClick={() => setIsEducationClick(true)}
              className="w-full"
            >
              Add eduation
            </button>
          </div>
        )
      )}
      {isCityLoading ? (
        <div>Loading...</div>
      ) : isCityClick ? (
        <form className="flex gap-x-2" onSubmit={handleSubmit(onCitySubmit)}>
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="location_city"
          />
          <InputField
            register={register}
            errors={errors}
            id="city"
            type="text"
            value={city}
            setPostContent={setCity}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile city"
            handleKeyPress={handleKeyPressCity}
          />
        </form>
      ) : userIntro.city ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="location_city"
          />
          <div className="font-bold">{userIntro.city}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button onClick={() => setIsCityClick(true)} className="w-full">
              Add current city
            </button>
          </div>
        )
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button onClick={handleEditClick} className="w-full">
            Edit details
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
