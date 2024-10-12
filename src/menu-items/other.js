// assets
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';

// constant
const icons = { AttachFileIcon, AddIcon, TableRowsOutlinedIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Importer fichier',
      type: 'item',
      url: '/import-page',
      icon: icons.AttachFileIcon,
      breadcrumbs: false
    },
    {
      id: 'add-category',
      title: 'Affecter catégories',
      type: 'item',
      url: '/add-category-page',
      icon: icons.AddIcon,
      breadcrumbs: false
    },
    {
      id: 'all-historiques',
      title: 'Consulter historiques',
      type: 'item',
      url: '/consulter-historiques-page',
      icon: icons.TableRowsOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
