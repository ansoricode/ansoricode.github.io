<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Mprofesi extends CI_Model {

    private $table = array("bidangusaha");

    private $select_column = array(
        "bidangusaha.id as id",
        "bidangusaha.nama as nama",
        "bidangusaha.status as status",
        "bidangusaha.date_created as date_created",
    );

    private $column_search = array(
        "nama",
    );

    private $select_order = array(
        "nama",
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
 
        $i = 0;     
        foreach ($this->column_search as $item) { 
            // if($this->input->post('pencarian')) {
            if(isset($_POST['search']['value']) && $_POST['search']['value']) {
                if($i===0) {
                    $this->db->group_start(); 
                    // $this->db->like($item, $this->input->post("pencarian"));
                    $this->db->like($item, $_POST['search']['value']);
                }
                else {
                    // $this->db->or_like($item, $this->input->post("pencarian"));
                    $this->db->like($item, $_POST['search']['value']);
                } 
                if(count($this->column_search) - 1 == $i) { 
                    $this->db->group_end(); 
                }
            }
            $i++;
        }         
        // if($this->input->post("urutkan") && $this->input->post("order")) {
        if(isset($_POST['order'])) {   
            // $this->db->order_by($this->input->post("urutkan"), $this->input->post("order"));
            $this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        } 
        else if(isset($this->select_defaultorder)) {
            $order = $this->select_defaultorder;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function get_datatables() {
        $this->_get_datatables_query();
        // if($this->input->post("datatampil") && $this->input->post("halaman_sekarang")) {
        //     $datatampil = $this->input->post("datatampil");
        //     $halaman_sekarang = $this->input->post("halaman_sekarang");
        //     $offset = ($datatampil*($halaman_sekarang-1))+1;
        //     $this->db->limit($datatampil, ($offset-1) );
        // }
        if(isset($_POST['length']) && isset($_POST['start']) && $_POST['length'] != -1) {
            $this->db->limit($_POST['length'], $_POST['start']);
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

    public function get_profesi($where=NULL){
        $this->db->from($this->table[0]);
        if($where != NULL) {
            $this->db->where($where);
        }
        $user = $this->db->get();
        return $user->result_array();
    }

}
