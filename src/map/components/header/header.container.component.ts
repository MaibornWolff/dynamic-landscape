import {withRouter} from 'react-router';
import Header, {Props} from './header.component';

export default withRouter<Props, typeof Header>(Header);
