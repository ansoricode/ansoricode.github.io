<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Muser extends CI_Model {

    private $table = array("user", "bank");

    private $select_column = array(
        "user.id as id",
        "user.username  as username",
        "user.password  as password",
        "user.nib  as nib",
        "user.salt  as salt",
        "user.nama  as nama",
        "user.nohp  as nohp",
        "user.jabatan  as jabatan",
        "user.jenisakun  as jenisakun",
        "user.status  as status",
        "user.date_created  as date_created",
    );

    private $column_search = array(
        "username",
    );

    private $select_order = array(
        "id",
        "username",
        "telepon",
        "level",
        "status",
        null,
    );

    private $select_defaultorder = array(
        "id" => "desc"
    );

    public function __construct() {
        parent::__construct();
    }

    private function _get_datatables_query() {

        $this->db->select(implode(',', $this->select_column));

        $this->db->from(implode(',', $this->table));

        // $this->db->where("bank.id = user.idbank");
 
        $i = 0;     
        foreach ($this->column_search as $item) { 
            if($this->input->post('pencarian')) {
                if($i===0) {
                    $this->db->group_start(); 
                    $this->db->like($item, $this->input->post("pencarian"));
                }
                else {
                    $this->db->or_like($item, $this->input->post("pencarian"));
                } 
                if(count($this->column_search) - 1 == $i) { 
                    $this->db->group_end(); 
                }
            }
            $i++;
        }         
        if($this->input->post("urutkan") && $this->input->post("order")) {
            $this->db->order_by($this->input->post("urutkan"), $this->input->post("order"));
        } 
        else if(isset($this->select_defaultorder)) {
            $order = $this->select_defaultorder;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function get_datatables() {
        $this->_get_datatables_query();
        if($this->input->post("datatampil")) {
            $this->db->limit($this->input->post('datatampil'), $this->input->post("halaman_sekarang"));
        }
        $query = $this->db->get();
        return $query->result();
    }

    function count_filtered() {
        try {
            $this->_get_datatables_query();
            $query = $this->db->get();
            return $query->num_rows();
        }
        catch(Exception $e) {
            return -1;
        }
    }
 
    public function count_all() {
        $this->db->from($this->table[0]);
        return $this->db->count_all_results();
    }
    
    function insert($data) {
        $this->db->insert($this->table[0],$data);
        return $this->db->insert_id();
    }

    function insert_batch($data) {
        $this->db->insert_batch($this->table[0],$data);
        return $this->db->insert_id();
    }

    function update($data, $where) {
        $this->db->where($where);
        $query = $this->db->update($this->table[0], $data);
        return true;
    }

    public function delete($where) {
        $this->db->where($where);
        $this->db->delete($this->table[0]);
        return true;
    }

    public function get_user($where){
        $this->db->from($this->table[0]);
        $this->db->where($where);
        $user = $this->db->get();
        return $user->result_array();
    }

}
