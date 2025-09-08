import styles from './Popup.module.scss';
import pkgText from '../../../package.json?raw';
const pkg = JSON.parse(pkgText) as {
  name?: string;
  version?: string;
  description?: string;
  author?: string | { name?: string };
};

export default function Popup() {
  const project = {
    name: pkg.name ?? '',
    authors: (pkg.author as string) ?? pkg.author ?? '',
    version: pkg.version ?? '',
    description: pkg.description ?? '',
  };

  return (
    <div className={styles.popup}>
      <img src="./beliani_logo.svg" width="50%" style={{ maxWidth: '200px' }} alt="Popup Image" />
      <table cellPadding={0} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>Extension Name</th>
            <th>Created By</th>
            <th>Version</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{project.name}</td>
            <td>{project.authors}</td>
            <td>{project.version}</td>
            <td>{project.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
