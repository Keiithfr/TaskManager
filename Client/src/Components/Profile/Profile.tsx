import styles from './Profile.module.css'
import { useAuth } from '../../context/AuthContext';
import { IoMdClose } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { TbCapture, TbCaptureOff } from "react-icons/tb";
import Cropper from 'react-easy-crop';


type CropArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const createCroppedFile = (
    imageSrc: string,
    pixelCrop: CropArea
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            const context = canvas.getContext("2d");

            if (!context) {
                reject(new Error("Unable to process image"));
                return;
            }

            context.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Unable to create cropped image"));
                        return;
                    }

                    resolve(
                        new File([blob], "profile-photo.jpg", {
                            type: "image/jpeg"
                        })
                    );
                },
                "image/jpeg",
                0.92
            );

        };
        image.onerror = () => reject(new Error("Unable to load image"));
        image.src = imageSrc;
    })
}




const EditProfile = () => {

    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name ?? "");
    const [editingName, setEditingName] = useState(false);
    const [message, setMessage] = useState("");

    const [showPhotoMenu, setShowPhotoMenu] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    const [showDiscardModal, setShowDiscardModal] = useState(false);

    const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [removePhoto, setRemovePhoto] = useState(false);

    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;

    } | null>(null);


    const hasNameChanged = name !== (user?.name ?? "");
    const hasPhotoChanged =
        pendingPhoto !== null ||
        removePhoto ||
        photoPreview !== null;

    const hasChanges = hasNameChanged || hasPhotoChanged;


    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, 5000);

        return () => clearTimeout(timer);


    }, [message])

    useEffect(() => {
        if (!showCamera) return

        let stream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

            } catch (error) {
                console.error("Camera access denied:", error)
                setMessage("Unable to access camera")
            }
        }
        startCamera();

        return () => {

            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }

        };
    }, [showCamera])

    useEffect(() => {
        if (!photoPreview) return;

        return () => {
            URL.revokeObjectURL(photoPreview);
        };
    }, [photoPreview]);
    useEffect(() => {
        if (!imageToCrop) return;

        return () => {
            URL.revokeObjectURL(imageToCrop);
        };
    }, [imageToCrop]);

    const handleTakePhoto = () => {
        const video = videoRef.current;

        if (!video) return;

        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        if (!context) return;

        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob((blob) => {
            if (!blob) return;

            const file = new File(
                [blob],
                "profile-photo.jpg",
                { type: "image/jpeg" }
            );
            const imageUrl = URL.createObjectURL(file);
            setImageToCrop(imageUrl);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
            setRemovePhoto(false);

            stopCamera();
        }, "image/jpeg")


    };


    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);


        setImageToCrop(imageUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setShowPhotoMenu(false);
        e.target.value = "";

    };

    const stopCamera = () => {
        const video = videoRef.current;

        if (!video) return;

        const stream = video.srcObject as MediaStream | null;

        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        video.srcObject = null;

        setShowCamera(false)
    }


    const handleDelete = async () => {

        setPendingPhoto(null);
        setPhotoPreview(null);
        setRemovePhoto(true);
        setShowPhotoMenu(false);




    }

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("removePhoto", String(removePhoto));

        if (pendingPhoto) {
            formData.append("profileImage", pendingPhoto)
        }
        try {


            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/users/save-changes`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message);
                return
            }
            updateUser(data.user);
            setEditingName(false);
            setMessage(data.message);

            setPendingPhoto(null);
            setPhotoPreview(null);
            setRemovePhoto(false);
        } catch (error) {
            console.error("Failed to save profile:", error)
            setMessage("Unable to save changes. Please check your connection and try again.")
        }


    }

    const handleClose = () => {
        if (hasChanges) {
            setShowDiscardModal(true);
            return;
        }
        navigate("/dashboard");
    }

    const handleDiscard = () => {
        setName(user?.name ?? "");
        setPendingPhoto(null);
        setPhotoPreview(null);
        setRemovePhoto(false);
        setEditingName(false);
        setShowDiscardModal(false);

        navigate("/dashboard")
    }


    const onCropComplete = (
        _croppedArea: { x: number; y: number; width: number; height: number },
        croppedAreaPixels: { x: number; y: number; width: number; height: number }
    ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropConfirm = async () => {
        if (!imageToCrop || !croppedAreaPixels) {
            setMessage("Please select a crop area first.")
            return;
        }

        try {
            const croppedFile = await createCroppedFile(
                imageToCrop,
                croppedAreaPixels
            );

            setPendingPhoto(croppedFile);
            setPhotoPreview(URL.createObjectURL(croppedFile));
            setRemovePhoto(false);
            setImageToCrop(null);

            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
        } catch (error) {
            console.error("Failed to crop image:", error);
            setMessage("Unable to crop image. Please try again.")
        }
    }



    const handleCropCancel = () => {
        setImageToCrop(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
    };





    return (
        <section className={styles.profileSection}>
            <div className={styles.top}>
                <button onClick={handleClose}
                >
                    <IoMdClose className={styles.close} />

                </button>

                <h1>Edit profile</h1>
                <button onClick={handleSave}
                    disabled={!hasChanges}>Save</button>
            </div>
            <div className={styles.middle}>
                <div className={styles.profileImage}>
                    {photoPreview && !removePhoto ? (
                        <img src={photoPreview} />
                    ) : !removePhoto && user?.profileImage ? (
                        <img src={user?.profileImage} />
                    ) : (
                        <div className={styles.placeholder}>
                            {/* Your default profile icon goes here */}
                        </div>
                    )
                    }


                </div>
                <div className={styles.penDiv}
                    onClick={() => setShowPhotoMenu((previous) => !previous)}
                >
                    <FaPen />

                </div>

                {showPhotoMenu && (
                    <div className={styles.photoMenu}>
                        {!showCamera ? (
                            <>
                                <button onClick={handleDelete}>Remove photo</button>
                                <label className={styles.photoOption}>
                                    Pick from your photos
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />

                                </label>

                                <button onClick={() => setShowCamera(true)}>
                                    Take photo
                                </button>
                            </>
                        ) : (
                            <div className={styles.camera}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                />
                                <div className={styles.capture}><TbCapture onClick={handleTakePhoto} />
                                    <TbCaptureOff onClick={stopCamera} />
                                </div>
                            </div>

                        )}
                    </div>


                )}

            </div>

            <div className={styles.bottom}>
                <h3>Name</h3>

                {editingName ? (
                    <>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />

                    </>
                ) : (
                    <>
                        <span onClick={() => setEditingName(true)}>{user?.name}</span>
                    </>
                )
                }


            </div>

            {showDiscardModal && (
                <>
                    <div className={styles.modalBackdrop}>
                        <div className={styles.discardModal}>
                            <h3>Discard changes?</h3>
                            <p>If you leave now, you'll lose any edits you've made.</p>
                            <button onClick={() => setShowDiscardModal(false)}>Keep editing</button>
                            <button onClick={handleDiscard}>Discard</button>
                        </div>
                    </div>
                </>
            )}





            {message && (
                <div className={styles.messageDiv}>
                    <p>{message}</p>
                </div>
            )}


            {imageToCrop && (
                <div className={styles.cropModal}>
                    <div className={styles.cropContainer}>
                        <Cropper
                            image={imageToCrop}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <label>
                        Zoom
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />
                    </label>
                    <button onClick={handleCropCancel}>
                        Cancel
                    </button>
                    <button onClick={handleCropConfirm}>
                        Use this photo
                    </button>
                </div>
            )
            }
        </section>
    )

}


export default EditProfile;