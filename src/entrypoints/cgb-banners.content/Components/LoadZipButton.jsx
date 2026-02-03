import { useEffect, useState } from 'react';
import { checkedDeviceType, filledCashback, COUNTRY_CASHBACK, COUNTRY_CODE } from '../assets';
import { getModal } from '../assets';
import ChooseZipBtn from './ChooseZipBtn';
import JSZip from 'jszip';

export default function LoadZipButton() {
  const [files, setFiles] = useState([]);
  const [mobileFiles, setMobilesFiles] = useState(null);
  const [desktopFiles, setDesktopFiles] = useState(null);
  const [zipName, setZipName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modernMobile = [];

    const form = document.querySelector('form.banner-form');
    const input = form.querySelectorAll('input[type="file"][name^=pic][size="30"]');
    const mobile_input = form.querySelectorAll('input[type="file"][name^=mobile_pic][size="30"]');

    setDesktopFiles(Array.from(input));

    mobile_input.forEach((item, index) => {
      if (index > 16) {
        return modernMobile.push(item);
      }
    });
    setMobilesFiles(Array.from(modernMobile));
  }, []);

  const handleZipUpload = async e => {
    try {
      const zipfile = e.target.files[0];
      if (!zipfile) return;

      setZipName(zipfile.name);

      const zip = await JSZip.loadAsync(zipfile);
      const fileInside = Object.values(zip.files).filter(item => !item.dir);
      const extractedFiles = await Promise.all(
        fileInside.map(async file => {
          const blob = await file.async('blob');
          return new File([blob], file.name, { type: blob.type || 'application/octet-stream' });
        }),
      );

      setFiles(extractedFiles);
    } catch (e) {
      getModal('error', 'Please upload ZIP file!');
      setZipName('');
      setFiles([]);
      return;
    }
  };

  useEffect(() => {
    if (files.length === 0) return;
    setLoading(true);

    const sortedForDesktopOrMobile = () => {
      try {
        for (const item of files) {
          // const fileKey = item.name
          //   .replace(/\.[^/.]+$/, '')
          //   .trim()
          //   .toUpperCase();

          if (!item.name.includes('desktop') && !item.name.includes('mobile')) {
            filledCashback(item, desktopFiles);
          } else {
            checkedDeviceType(item, 'desktop', desktopFiles);
            checkedDeviceType(item, 'mobile', mobileFiles);
          }
        }

        getModal('nyan', 'Files added to inputs!');
      } catch (e) {
        console.log(e);
        getModal('cryMen', 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      sortedForDesktopOrMobile();
    }, 2000);

    return () => clearTimeout(timer);
  }, [files]);

  return (
    <div className="zip__wrapper">
      <ChooseZipBtn handleZipUpload={handleZipUpload} zipName={zipName} loading={loading} />
    </div>
  );
}
